import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/data/events";

const UpcomingEvents = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                Upcoming Events
              </h1>
              <p className="text-lg text-primary-foreground/90 md:text-xl">
                What's next for the NCAA community.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-3 font-heading text-2xl font-bold">{event.title}</h3>
                    <p className="mb-4 text-muted-foreground">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:w-48">
                    <Button className="w-full">RSVP</Button>
                    <Button variant="outline" className="w-full">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UpcomingEvents;



