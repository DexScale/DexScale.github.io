import singleLogo from "../assets/single.png";
import qrCode from "../assets/qr-DCtwrz5m.jpg";

interface FooterSectionProps {
  t: (key: string) => string;
}

const contactItems = [
  { label: "联系方式", value: "010-53607783；+86 131-2661-8227" },
  { label: "商务邮箱", value: "business@linkerbot.cn" },
  { label: "技术支持", value: "support@linkerbot.cn" },
  { label: "人才招募", value: "hr@linkerbot.cn" },
  { label: "公司地址", value: "北京市海淀区大钟寺东路京仪科技大厦" },
];

export const FooterSection = ({ t: _t }: FooterSectionProps) => {
  return (
    <footer id="footer" className="scroll-mt-20 border-t border-(--hm-line) bg-[#1a1b1f] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start gap-10 max-[900px]:flex-col">
        {/* Brand + description */}
        <div className="min-w-[200px] flex-1">
          <img
            src={singleLogo}
            alt="灵心巧手 Linkerbot"
            className="mb-4 h-10 w-auto object-contain"
          />
          <p className="max-w-[280px] text-sm leading-relaxed text-(--hm-muted)">
            专注于人工智能和机器人解决方案，帮助开发者、企业、科研机构快速实现真实场景落地
          </p>
          <p className="mt-6 text-xs text-(--hm-muted)">
            ©灵心巧手 2024 京ICP备2023021624号-4
          </p>
        </div>

        {/* Divider */}
        <div className="hidden w-px self-stretch bg-(--hm-line) md:block" />

        {/* Contact info */}
        <div className="flex-2 space-y-3.5">
          {contactItems.map((item) => (
            <div key={item.label} className="flex items-start gap-6 text-sm">
              <span className="w-16 shrink-0 text-(--hm-muted)">{item.label}</span>
              <span className="text-(--hm-text)">{item.value}</span>
            </div>
          ))}
        </div>

        {/* QR code */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={qrCode}
            alt="微信二维码"
            className="h-[100px] w-[100px] rounded-lg object-cover"
          />
          <span className="text-xs text-(--hm-muted)">微信扫一扫</span>
        </div>
      </div>
    </footer>
  );
};
