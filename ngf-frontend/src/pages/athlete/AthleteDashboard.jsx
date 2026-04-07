const metrics = [
  { label: "Total Members", value: "1,284", trend: "+12%", icon: "group" },
  { label: "Monthly Revenue", value: "$42.8k", trend: "+8.4%", icon: "payments" },
  { label: "Active Workouts", value: "342", trend: "Live Now", icon: "fitness_center" },
  { label: "Growth Retention", value: "94%", trend: "Peak", icon: "trending_up" },
];

const schedule = [
  { day: "MON", date: "12", title: "Physiotherapy Review", detail: "14:00 • Sports Clinic Center" },
  { day: "TUE", date: "13", title: "Coach Strategy Meeting", detail: "09:30 • Virtual Room 4" },
  { day: "THU", date: "15", title: "VO2 Max Performance Test", detail: "11:00 • Elite Lab 2" },
];

const alerts = [
  { title: "Hiit Max Finish", time: "10:00 AM", subtitle: "Studio A • 12/15 slots" },
  { title: "Mobility Flow", time: "01:30 PM", subtitle: "Yoga Deck • 8/20 slots" },
  { title: "Olympic Lift", time: "04:00 PM", subtitle: "Weight Room • 5/10 slots" },
];

const dietPlan = [
  {
    time: "07:30",
    title: "Power Oats",
    detail: "Organic oats, whey isolate, blueberries, almond butter.",
    info: "650 kcal • 45g Protein",
  },
  {
    time: "12:30",
    title: "Salmon Bowl",
    detail: "Wild salmon, black rice, broccoli & avocado mash.",
    info: "850 kcal • 55g Protein",
  },
  {
    time: "16:00",
    title: "Pre-Workout Snack",
    detail: "Banana, rice cakes, honey, BCAA mix.",
    info: "350 kcal • 80g Carbs",
  },
  {
    time: "19:30",
    title: "Grilled Steak",
    detail: "Grass-fed ribeye, sweet potato mash, asparagus.",
    info: "950 kcal • 65g Protein",
  },
];

export default function AthleteDashboard() {
  return (
    <>
      <section className="athlete-hero">
        <div className="hero-mask">
          <div className="hero-content">
            <span className="hero-pill">TODAY'S PROTOCOL</span>
            <h1>
              Explosive Power & <span>Metabolic Finisher</span>
            </h1>
            <p>Empower your next training block with 75 minutes of high-intensity execution.</p>
            <div className="hero-actions">
              <button className="btn primary">Start Workout</button>
              <button className="btn ghost">Add Routine</button>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <div className="metric-label">
              <span>{metric.label}</span>
              <span className="metric-trend">{metric.trend}</span>
            </div>
            <div className="metric-main">
              <strong>{metric.value}</strong>
              <span className="material-symbols-outlined">{metric.icon}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="card grid-schedule">
          <div className="card-head">
            <div>
              <h3>Upcoming Schedule</h3>
              <p>Key sessions & meetings</p>
            </div>
            <button className="link-btn">View Calendar</button>
          </div>
          <div className="schedule-list">
            {schedule.map((item) => (
              <article key={item.title}>
                <div className="schedule-date">
                  <span>{item.day}</span>
                  <strong>{item.date}</strong>
                </div>
                <div>
                  <p>{item.title}</p>
                  <small>{item.detail}</small>
                </div>
                <span className="material-symbols-outlined">video_call</span>
              </article>
            ))}
          </div>
        </div>

        <div className="card alerts-card">
          <h3>Live Updates</h3>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <article key={alert.title}>
                <div>
                  <p>{alert.title}</p>
                  <small>{alert.subtitle}</small>
                </div>
                <span className="text-[10px] font-bold">{alert.time}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="personal-grid">
        <div className="card personal-bests">
          <h3>Personal Bests</h3>
          <div className="personal-items">
            {[
              { label: "Back Squat", value: "185 kg", detail: "+5% vs last month" },
              { label: "5km Run", value: "18:42 min", detail: "6 sec PR" },
              { label: "Max Power", value: "1,140 W", detail: "+3% peak" },
            ].map((item) => (
              <article key={item.label}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.detail}</span>
                <div className="progress">
                  <div />
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="card diet-plan">
          <div className="card-head">
            <h3>Fueling Strategy</h3>
            <p>Day 4 of 7 • Hypertrophy & Recovery</p>
          </div>
          <div className="calories">
            <div>
              <strong>3,400</strong>
              <span>Daily Target</span>
            </div>
            <div>
              <strong>2,150</strong>
              <span>Consumed</span>
            </div>
          </div>
          <div className="diet-grid">
            {dietPlan.map((meal) => (
              <article key={meal.title}>
                <div className="diet-head">
                  <span>{meal.time}</span>
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <h4>{meal.title}</h4>
                <p>{meal.detail}</p>
                <small>{meal.info}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
