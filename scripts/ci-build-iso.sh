#!/bin/bash
# Headless x-Nord OS ISO build for CI (no Cubic GUI)
# Extracts Kubuntu ISO, applies customizations, repacks
# Contact: hello@xnord.co.uk

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
WORK_DIR="${WORK_DIR:-/tmp/xnord-build}"
BASE_ISO="${1:-}"

# Kubuntu 24.04 download URL
KUBUNTU_URL="https://cdimage.ubuntu.com/kubuntu/releases/24.04/release/kubuntu-24.04.4-desktop-amd64.iso"

mkdir -p "$WORK_DIR"
cd "$WORK_DIR"
WORK_DIR_ABS="$(pwd)"

# Download base ISO if not provided
if [ -z "$BASE_ISO" ] || [ ! -f "$BASE_ISO" ]; then
    echo "Downloading Kubuntu 24.04..."
    BASE_ISO="$WORK_DIR_ABS/kubuntu-24.04.4-desktop-amd64.iso"
    wget --progress=bar:force -O "$BASE_ISO" "$KUBUNTU_URL" || {
        echo "Download failed. Use: $0 /path/to/kubuntu-24.04-desktop-amd64.iso"
        exit 1
    }
fi

echo "=== x-Nord OS CI Build ==="
echo "Base: $BASE_ISO"
echo "Work: $WORK_DIR_ABS"

# Create directories (use absolute paths for overlay)
mkdir -p iso squash upper work chroot newiso
sudo rm -rf iso/* upper/* work/* chroot/* newiso/* 2>/dev/null || true

# Mount ISO
echo "Mounting ISO..."
sudo mount -o loop,ro "$BASE_ISO" "$WORK_DIR_ABS/iso"

# Detect squashfs (Ubuntu 24.04 may use filesystem.squashfs or minimal.squashfs)
SQUASHFS=""
for f in filesystem.squashfs minimal.squashfs; do
    if [ -f "$WORK_DIR_ABS/iso/casper/$f" ]; then
        SQUASHFS="$WORK_DIR_ABS/iso/casper/$f"
        break
    fi
done
if [ -z "$SQUASHFS" ]; then
    echo "Error: No squashfs found in casper/"
    ls -la "$WORK_DIR_ABS/iso/casper/" 2>/dev/null || true
    exit 1
fi
echo "Using squashfs: $SQUASHFS"

# Mount squashfs
echo "Mounting squashfs..."
sudo mount -t squashfs -o ro "$SQUASHFS" "$WORK_DIR_ABS/squash"

# Overlay for writable layer (absolute paths required)
echo "Creating overlay..."
sudo mount -t overlay overlay -o "lowerdir=$WORK_DIR_ABS/squash,upperdir=$WORK_DIR_ABS/upper,workdir=$WORK_DIR_ABS/work" "$WORK_DIR_ABS/chroot"

# Mount binds for chroot
sudo mount --bind /dev "$WORK_DIR_ABS/chroot/dev"
sudo mount --bind /run "$WORK_DIR_ABS/chroot/run"
sudo mount -t proc none "$WORK_DIR_ABS/chroot/proc"
sudo mount -t sysfs none "$WORK_DIR_ABS/chroot/sys"
sudo mount -t devpts none "$WORK_DIR_ABS/chroot/dev/pts"
sudo cp /etc/resolv.conf "$WORK_DIR_ABS/chroot/etc/resolv.conf" 2>/dev/null || true

# Run x-Nord install
echo "Applying x-Nord customizations..."
sudo "$SCRIPT_DIR/install-to-chroot.sh" "$WORK_DIR_ABS/chroot"

# Unmount binds
sudo umount "$WORK_DIR_ABS/chroot/dev/pts" "$WORK_DIR_ABS/chroot/dev" "$WORK_DIR_ABS/chroot/run" "$WORK_DIR_ABS/chroot/proc" "$WORK_DIR_ABS/chroot/sys" 2>/dev/null || true

# Copy ISO contents (excluding squashfs) to newiso
echo "Preparing new ISO..."
rsync -a --exclude='casper/filesystem.squashfs' --exclude='casper/filesystem.size' --exclude='casper/minimal*.squashfs' "$WORK_DIR_ABS/iso/" "$WORK_DIR_ABS/newiso/"

# Determine output squashfs name (match original)
SQUASHFS_NAME=$(basename "$SQUASHFS")
echo "Creating new $SQUASHFS_NAME (this takes several minutes)..."
sudo mksquashfs "$WORK_DIR_ABS/chroot" "$WORK_DIR_ABS/newiso/casper/$SQUASHFS_NAME" -noappend -comp xz -Xbcj x86

# Update filesystem.size if it exists
if [ -f "$WORK_DIR_ABS/iso/casper/filesystem.size" ]; then
    printf '%s' "$(sudo du -sx --block-size=1 "$WORK_DIR_ABS/chroot" | cut -f1)" | sudo tee "$WORK_DIR_ABS/newiso/casper/filesystem.size" > /dev/null
fi

# Unmount overlay and squash
sudo umount "$WORK_DIR_ABS/chroot"
sudo umount "$WORK_DIR_ABS/squash"
sudo umount "$WORK_DIR_ABS/iso"

# Build ISO with xorriso (detect boot structure from original)
echo "Building final ISO..."
OUTPUT_ISO="$PROJECT_ROOT/xnord-os-1.0-amd64.iso"
cd "$WORK_DIR_ABS/newiso"

# Kubuntu/Ubuntu 24.04: detect boot images and catalog
BOOT_IMG=""
EFI_IMG=""
BOOT_CATALOG="boot.catalog"
[ -f boot/grub/i386-pc/eltorito.img ] && BOOT_IMG="boot/grub/i386-pc/eltorito.img"
[ -f isolinux/isolinux.bin ] && BOOT_IMG="isolinux/isolinux.bin"
[ -f isolinux/boot.cat ] && BOOT_CATALOG="isolinux/boot.cat"
[ -f EFI/boot/bootx64.efi ] && EFI_IMG="EFI/boot/bootx64.efi"
[ -f boot/grub/efi.img ] && EFI_IMG="boot/grub/efi.img"

if [ -n "$BOOT_IMG" ]; then
    XORRISO_EFI=""
    [ -n "$EFI_IMG" ] && XORRISO_EFI="-eltorito-alt-boot -e $EFI_IMG -no-emul-boot"
    xorriso -as mkisofs -r -V "x-Nord OS 1.0" -o "$OUTPUT_ISO" -J -l -cache-inodes \
        -b "$BOOT_IMG" -c "$BOOT_CATALOG" -no-emul-boot -boot-load-size 4 -boot-info-table \
        $XORRISO_EFI -isohybrid-gpt-basdat . || \
    xorriso -as mkisofs -r -V "x-Nord OS 1.0" -o "$OUTPUT_ISO" -J -l .
else
    xorriso -as mkisofs -r -V "x-Nord OS 1.0" -o "$OUTPUT_ISO" -J -l .
fi

echo "Build complete: $OUTPUT_ISO"
