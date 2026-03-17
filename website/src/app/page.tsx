import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center px-4 py-24">
        <Image
          src="/xnord-logo.png"
          alt="x-Nord OS"
          width={220}
          height={56}
          className="h-14 w-auto mb-6"
          style={{ filter: "invert(1)", objectFit: "contain" }}
          priority
        />
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#4A90A4] uppercase mb-6">
          UNCLASSIFIED // FOR PUBLIC RELEASE
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-light tracking-tight mb-6">
          x-Nord OS
        </h1>
        <p className="text-sm sm:text-base font-mono text-[#FFFFFF] max-w-xl text-center mb-12">
          The operating system that does not compromise. Private by design. Fast by default. Yours entirely.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/download"
            className="border border-[#333] px-8 py-3 text-[10px] font-mono tracking-widest uppercase text-center"
          >
            DOWNLOAD ISO
          </a>
          <a
            href="https://github.com/JosephSRobinson/xnord-os"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#333] px-8 py-3 text-[10px] font-mono tracking-widest uppercase text-center"
          >
            VIEW SOURCE
          </a>
        </div>
      </section>

      <section className="border-t border-[#333]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-r border-b sm:border-b-0 lg:border-b-0 border-[#333] py-8 px-6 text-center">
            <div className="text-[10px] font-mono tracking-widest text-[#4A90A4] uppercase">207,201 FILES</div>
          </div>
          <div className="border-r border-b sm:border-b-0 lg:border-b-0 border-[#333] py-8 px-6 text-center">
            <div className="text-[10px] font-mono tracking-widest text-[#FFFFFF] uppercase">KERNEL 6.8</div>
          </div>
          <div className="border-r border-[#333] py-8 px-6 text-center">
            <div className="text-[10px] font-mono tracking-widest text-[#FFFFFF] uppercase">ZERO TELEMETRY</div>
          </div>
          <div className="py-8 px-6 text-center">
            <div className="text-[10px] font-mono tracking-widest text-[#FFFFFF] uppercase">100% OPEN SOURCE</div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#333] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#333]">
            <div className="border-b md:border-b-0 md:border-r border-[#333] p-8">
              <div className="text-[10px] font-mono text-[#4A90A4] uppercase mb-4">SYS-01 // NO TELEMETRY</div>
              <p className="text-sm font-mono text-[#FFFFFF]">
                Windows reports everything you do. x-Nord reports nothing. Ever.
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-[#333] p-8">
              <div className="text-[10px] font-mono text-[#4A90A4] uppercase mb-4">SYS-02 // AI ON YOUR DEVICE</div>
              <p className="text-sm font-mono text-[#FFFFFF]">
                Built-in AI assistant. Runs locally. No cloud. No subscriptions. No data leaving your machine.
              </p>
            </div>
            <div className="p-8">
              <div className="text-[10px] font-mono text-[#4A90A4] uppercase mb-4">SYS-03 // BUILT FOR HUMANS</div>
              <p className="text-sm font-mono text-[#FFFFFF]">
                Familiar Windows-style layout. No relearning. No documentation needed. Just install and work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#333] py-24 px-4">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#4A90A4] uppercase block mb-6">
            COMPARISON // SYSTEM MATRIX
          </span>
          <table className="w-full border border-[#333] font-mono text-xs">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="text-left py-4 px-6 text-[10px] tracking-widest uppercase text-[#666]"></th>
                <th className="text-left py-4 px-6 text-[10px] tracking-widest uppercase text-[#4A90A4]">x-Nord OS</th>
                <th className="text-left py-4 px-6 text-[10px] tracking-widest uppercase text-[#666]">Windows</th>
                <th className="text-left py-4 px-6 text-[10px] tracking-widest uppercase text-[#666]">macOS</th>
                <th className="text-left py-4 px-6 text-[10px] tracking-widest uppercase text-[#666]">Ubuntu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#333]">
                <td className="py-4 px-6 text-[#666] uppercase">Telemetry</td>
                <td className="py-4 px-6 text-[#FFFFFF]">NO</td>
                <td className="py-4 px-6 text-[#666]">YES</td>
                <td className="py-4 px-6 text-[#666]">PARTIAL</td>
                <td className="py-4 px-6 text-[#666]">NO</td>
              </tr>
              <tr className="border-b border-[#333]">
                <td className="py-4 px-6 text-[#666] uppercase">Local AI</td>
                <td className="py-4 px-6 text-[#FFFFFF]">YES</td>
                <td className="py-4 px-6 text-[#666]">PARTIAL</td>
                <td className="py-4 px-6 text-[#666]">PARTIAL</td>
                <td className="py-4 px-6 text-[#666]">NO</td>
              </tr>
              <tr className="border-b border-[#333]">
                <td className="py-4 px-6 text-[#666] uppercase">Open Source</td>
                <td className="py-4 px-6 text-[#FFFFFF]">YES</td>
                <td className="py-4 px-6 text-[#666]">NO</td>
                <td className="py-4 px-6 text-[#666]">NO</td>
                <td className="py-4 px-6 text-[#666]">YES</td>
              </tr>
              <tr className="border-b border-[#333]">
                <td className="py-4 px-6 text-[#666] uppercase">Cost</td>
                <td className="py-4 px-6 text-[#FFFFFF]">FREE</td>
                <td className="py-4 px-6 text-[#666]">PAID</td>
                <td className="py-4 px-6 text-[#666]">PAID</td>
                <td className="py-4 px-6 text-[#666]">FREE</td>
              </tr>
              <tr className="border-b border-[#333]">
                <td className="py-4 px-6 text-[#666] uppercase">Privacy</td>
                <td className="py-4 px-6 text-[#FFFFFF]">YES</td>
                <td className="py-4 px-6 text-[#666]">NO</td>
                <td className="py-4 px-6 text-[#666]">PARTIAL</td>
                <td className="py-4 px-6 text-[#666]">YES</td>
              </tr>
              <tr className="border-b border-[#333]">
                <td className="py-4 px-6 text-[#666] uppercase">Familiar UI</td>
                <td className="py-4 px-6 text-[#FFFFFF]">YES</td>
                <td className="py-4 px-6 text-[#666]">YES</td>
                <td className="py-4 px-6 text-[#666]">PARTIAL</td>
                <td className="py-4 px-6 text-[#666]">NO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-[#333] py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-mono font-light mb-6">
            READY TO SWITCH.
          </h2>
          <p className="text-sm font-mono text-[#FFFFFF] mb-12">
            Download x-Nord OS. Free. Open source. No strings.
          </p>
          <a
            href="https://download.xnord.co.uk/xnord-os-1.0-amd64.iso"
            className="inline-block border border-[#333] px-8 py-3 text-[10px] font-mono tracking-widest uppercase"
          >
            DOWNLOAD ISO
          </a>
        </div>
      </section>
    </div>
  );
}
