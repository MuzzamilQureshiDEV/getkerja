import {
  Calculator,
  Code2,
  Cog,
  ConciergeBell,
  Factory,
  GraduationCap,
  HardHat,
  Headset,
  HeartPulse,
  Megaphone,
  Truck,
  Users,
  Briefcase,
  Palette,
  PenLine,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Code2, Calculator, Megaphone, PenLine, Palette, Cog, HeartPulse, Factory, ConciergeBell, Truck, GraduationCap, Headset, Users, HardHat,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Briefcase;
  return <Icon className={className} aria-hidden />;
}
