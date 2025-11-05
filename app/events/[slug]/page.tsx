import Image from "next/image";
import { notFound } from "next/navigation";
import EventDetailItem from "@/components/EventDetailItem";
import EventAgenda from "@/components/EventAgenda";
import EventTags from "@/components/EventTags";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database/event.model";
import EventCard from "@/components/EventCard";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailsPage = async ({params} : {params:Promise<{slug:string}>}) => {
  const {slug} = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {event} = await res.json();

  if(!event) return notFound();
  
  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  return (
    <section id="event">
        <div className="header">
          <h1>Event Description</h1>
          <p>{event.description}</p>
        </div>

        <div className="details">
          {/* Left Side - Event Content */}
          <div className="content">
            <Image src={event.image} alt="Event Banner" width={800} height={800} className="banner" />

            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{event.overview}</p>
            </section>

            <section className="flex-col-gap-2">
              <h2>Event Details</h2>
              <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date} />
              <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time} />
              <EventDetailItem icon="/icons/pin.svg" alt="pin" label={event.location} />
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
              <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
            </section>

            <EventAgenda agendaItems={event.agenda} />

            <section className="flex-col-gap-2">
              <h2>About the Organizer</h2>
              <p>{event.organizer}</p>
            </section>

            <EventTags tags={event.tags}/>
          </div>
          {/* Right Side - Booking Form */}
          <aside className="booking">
            <div className="signup-card">
              <h2>Book Your Spot</h2>
              {bookings > 0 ? (
                <p className="text-sm">
                  Join {bookings} people who have already booked their spot
                </p>
              ) : (
                <p className="test-sm">Be the first to book your spot!</p>
              )}

              <BookEvent />
            </div>
          </aside>
        </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent)=>(
            <EventCard key={similarEvent.id} {...similarEvent}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage
