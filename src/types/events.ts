export type EventItem = {
  title: string;
  description: string;
}

export type EventBlock = {
  start: number;
  end: number;
  items: EventItem[]
}

