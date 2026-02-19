import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { upcomingEvents } from "@/data/events";

export const UpcomingEventsPreview = () => {
    const previewEvents = upcomingEvents.slice(0, 3);

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Upcoming Events
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Stay connected with NCAA meetings, celebrations, and community gatherings
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
                    {previewEvents.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-xl border border-border bg-background overflow-hidden shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="w-full h-64 bg-muted/50" aria-hidden />
                            <div className="p-6">
                                <h3 className="mb-3 font-heading text-lg font-bold">{event.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                    {event.description}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4 shrink-0" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 shrink-0" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group hover:border-primary/50 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="View all upcoming events"
                    >
                        <Link to="/events/upcoming">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};
