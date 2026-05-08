import robotImg from "../assets/teleoperation.png";
import { Reveal } from "./Reveal";

interface TeleoperationSectionProps {
  t: (key: string) => string;
}

interface DeviceBlock {
  id: string;
  nameKey: string;
  itemKeys: string[];
}

const devices: DeviceBlock[] = [
  {
    id: "lta",
    nameKey: "teleop.lta.name",
    itemKeys: [
      "teleop.lta.i1",
      "teleop.lta.i2",
      "teleop.lta.i3",
      "teleop.lta.i4",
      "teleop.lta.i5",
      "teleop.lta.i6",
      "teleop.lta.i7",
      "teleop.lta.i8",
    ],
  },
  {
    id: "lffg",
    nameKey: "teleop.lffg.name",
    itemKeys: [
      "teleop.lffg.i1",
      "teleop.lffg.i2",
      "teleop.lffg.i3",
      "teleop.lffg.i4",
      "teleop.lffg.i5",
      "teleop.lffg.i6",
      "teleop.lffg.i7",
    ],
  },
];

export const TeleoperationSection = ({ t }: TeleoperationSectionProps) => {
  return (
    <section
      id="teleoperation"
      className="scroll-mt-20 bg-(--hm-bg) px-6 py-24 max-[900px]:px-5 max-[900px]:py-16"
    >
      <Reveal className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-(--hm-line) bg-(--hm-panel)">
          <div className="relative flex items-center justify-center bg-black min-h-[480px] lg:min-h-[640px]">
            <img
              src={robotImg}
              alt={t("teleop.image_alt")}
              loading="lazy"
              className="w-full h-full object-contain max-h-[640px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center px-10 py-12 max-[900px]:px-6 max-[900px]:py-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-(--hm-text) leading-tight mb-4">
                {t("teleop.title")}
              </h2>
              <p className="text-(--hm-muted) text-sm leading-[1.8]">{t("teleop.desc")}</p>
            </div>

            <div className="flex flex-col gap-8">
              {devices.map((device) => (
                <div key={device.id}>
                  <h3 className="text-base font-semibold text-(--hm-text) mb-3 pb-2 border-b border-(--hm-line)">
                    {t(device.nameKey)}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                    {device.itemKeys.map((itemKey) => (
                      <li
                        key={itemKey}
                        className="flex items-start gap-2 text-sm text-(--hm-muted) leading-[1.7]"
                      >
                        <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-(--hm-cyan)/60" />
                        <span>{t(itemKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
