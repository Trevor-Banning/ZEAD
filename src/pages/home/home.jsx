import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import { getEventsForToday } from "../../services/CalendarService";
import { feedSources } from "../../data/rssfeeds";

export default function Home() {
  const feedRef = useRef();
  let scrollInterval;

  const scrollFeed = (direction) => {
    scrollInterval = setInterval(() => {
      if (feedRef.current) {
        feedRef.current.scrollLeft += direction * 10;
      }
    }, 10);
  };

  const stopScroll = () => clearInterval(scrollInterval);

  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      const allItems = [];

      for (const feed of feedSources) {
        try {
          const res = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
              feed.url
            )}`
          );
          const data = await res.json();
          if (data.items) {
            allItems.push(
              ...data.items.map((item) => ({
                ...item,
                source: feed.name,
              }))
            );
          }
        } catch (err) {
          console.error(`Failed to fetch ${feed.name}`, err);
        }
      }

      const sorted = allItems.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
      );
      setFeedItems(sorted.slice(0, 8));
    };

    fetchFeeds();
  }, []);

  const [dayData, setDayData] = useState(null);

  useEffect(() => {
    const fetchToday = async () => {
      const data = await getEventsForToday();
      setDayData(data);
    };
    fetchToday();
  }, []);

  return (
    <div className="home-container">
      <h1 className="brand-header">Welcome to the Dev Portfolio</h1>

      <section className="rss-section">
        <h2>✦ WORLD</h2>

        <div className="rss-wrapper">
          <div
            className="rss-arrow left"
            onMouseEnter={() => scrollFeed(-1)}
            onMouseLeave={stopScroll}
          />

          <div className="rss-feed" ref={feedRef}>
            {feedItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="rss-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="rss-tag">{item.source}</span>
                <p>{item.title}</p>
              </a>
            ))}
          </div>

          <div
            className="rss-arrow right"
            onMouseEnter={() => scrollFeed(1)}
            onMouseLeave={stopScroll}
          />
        </div>
      </section>

      <section className="calendar-section">
        <h2>✦ Day at a Glance</h2>

        {dayData === null ? (
          <p>Loading today's events...</p>
        ) : Object.values(dayData.pillars || {}).flat().length === 0 ? (
          <p>No events for today.</p>
        ) : (
          <>
            <p>
              You've got {Object.values(dayData.pillars).flat().length} items
              scheduled today:
            </p>
            <ul className="glance-event-list">
              {Object.entries(dayData.pillars).map(([pillar, events]) =>
                events.map((event, idx) => (
                  <li key={`${pillar}-${idx}`} className="glance-event-item">
                    <strong>{pillar}:</strong> {event.title}
                    {event.time && ` @ ${event.time}`}
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
