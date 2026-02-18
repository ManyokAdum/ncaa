import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { upcomingEvents } from "@/data/events";

// Match leadership section gradient for visual consistency
const eventsGradient = "from-[hsl(278_42%_34%)] to-[hsl(276_46%_30%)]";

export const UpcomingEventsPreview = () => {
    // Show only the first 3 upcoming events
    const previewEvents = upcomingEvents.slice(0, 3);

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                {/* Section Header - same as Leadership */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Upcoming Events
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Stay connected with NCAA meetings, celebrations, and community gatherings
                    </p>
                </div>

                {/* Events Cards Grid - same layout as leadership cards */}
                <div className="space-y-6 sm:grid sm:gap-6 sm:space-y-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto max-w-5xl mb-12">
                    {previewEvents.map((event) => (
                        <div
                            key={event.id}
                            className="group relative mx-auto w-full max-w-xs overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted/30 shadow-lg transition-all duration-300 sm:max-w-none md:hover:-translate-y-1 md:hover:shadow-xl flex flex-col"
                        >
                            {/* Gradient overlay matching Leadership style */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${eventsGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                            {/* Top visual block - Calendar/date (like leader image area) */}
                            <div className="flex justify-center pt-4 md:pt-6">
                                <div className={`flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-gradient-to-br ${eventsGradient} shadow-md md:h-32 md:w-full md:rounded-none md:rounded-t-xl md:min-h-36`}>
                                    <Calendar className="h-12 w-12 text-white md:h-14 md:w-14" />
                                </div>
                            </div>

                            {/* Content - centered like leadership cards */}
                            <div className="relative flex flex-col items-center text-center p-4 flex-1 md:p-4 lg:p-8">
                                <h3 className="mb-1 font-heading text-lg font-bold md:text-lg lg:text-xl">
                                    {event.title}
                                </h3>
                                <p className="mb-1 text-xs text-muted-foreground md:text-sm">
                                    {event.date}
                                </p>
                                <p className={`mb-2 text-sm font-semibold bg-gradient-to-r ${eventsGradient} bg-clip-text text-transparent md:text-sm lg:mb-3 lg:text-base`}>
                                    {event.time}
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm line-clamp-2 mb-2">
                                    {event.description}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                                        {event.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button - same as Leadership */}
                <div className="mt-12 flex justify-center">
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

