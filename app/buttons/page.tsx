import { Button } from "@/components/ui/button";

export default function ButtonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between mt-8">
      <Button variant="primary">primary</Button>
      <Button variant="primaryOutline">primary Outline</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="secondaryOutline">secondary Outline</Button>
      <Button variant="danger">danger</Button>
      <Button variant="dangerOutline">danger Outline</Button>
      <Button variant="super">super</Button>
      <Button variant="superOutline">super Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">sidebar</Button>
      <Button variant="sidebarOutline">sidebar Outline</Button>
    </div>
  );
}
