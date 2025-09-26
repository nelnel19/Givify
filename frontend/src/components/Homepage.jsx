"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/homepage.css"

const Homepage = () => {
  const [userName, setUserName] = useState("")
  const [stats, setStats] = useState({
    campaigns: 0,
    peopleServed: 0,
    totalImpact: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("lastLoggedInUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUserName(parsedUser.name)
    }

    fetchCampaignsData()
  }, [])

  const fetchCampaignsData = async () => {
    try {
      const campaignsResponse = await fetch("http://localhost:5000/campaigns")
      const campaignsData = await campaignsResponse.json()

      const totalCampaigns = campaignsData.length
      const totalCollected = campaignsData.reduce(
        (sum, campaign) => sum + (campaign.collectedAmount || 0),
        0
      )

      const estimatedPeopleServed = Math.round(totalCollected * 0.1) // Example calculation

      setStats({
        campaigns: totalCampaigns,
        peopleServed: estimatedPeopleServed,
        totalImpact: totalCollected
      })
    } catch (error) {
      console.error("Error fetching campaign data:", error)
      setStats({
        campaigns: 127,
        peopleServed: 2543,
        totalImpact: 50000
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExploreClick = () => {
    navigate("/campaigns") // Navigate to campaigns page
  }

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {userName ? (
            <h1 className="hero-title">
              Know that your donation is making a difference, {userName}
            </h1>
          ) : (
            <h1 className="hero-title">
              Know that your donation is making a difference
            </h1>
          )}
          <p className="hero-subtitle">
            Givify uses 100% of your donation to fund meaningful projects around
            the world and then proves every single project you fund, complete
            with GPS coordinates and photos.
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={handleExploreClick}>
              <span>Explore Campaigns</span>
              <span>→</span>
            </button>
            <button className="cta-button secondary">
              <span>Learn More</span>
            </button>
          </div>
        </div>

        <div className={`hero-stats ${isLoading ? "loading-stats" : ""}`}>
          <div className="stat-item">
            <h3>{stats.campaigns.toLocaleString()}+</h3>
            <p>Active Campaigns</p>
          </div>
          <div className="stat-item">
            <h3>{stats.peopleServed.toLocaleString()}+</h3>
            <p>People Served</p>
          </div>
          <div className="stat-item">
            <h3>${stats.totalImpact.toLocaleString()}</h3>
            <p>Total Impact</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="content-section alternate">
        <h2 className="section-title">How Givify Works</h2>
        <p className="section-subtitle">
          Three simple steps to make a lasting impact on communities worldwide
        </p>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <span className="icon-heart">1</span>
            </div>
            <h3>Discover Causes</h3>
            <p>
              Browse verified campaigns and find meaningful causes that resonate
              with your values and passion for change.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="icon-shield">2</span>
            </div>
            <h3>Donate Securely</h3>
            <p>
              Make safe, transparent contributions with our secure payment
              system and real-time tracking of your impact.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">
              <span className="icon-chart">3</span>
            </div>
            <h3>See Your Impact</h3>
            <p>
              Receive detailed updates, photos, and GPS coordinates showing
              exactly how your donation made a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="content-section">
        <h2 className="section-title">Stories of Hope</h2>
        <p className="section-subtitle">
          Real stories from communities and donors whose lives have been
          transformed
        </p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-text">
              Thanks to Givify, our community now has access to clean drinking
              water. The transparency and regular updates made us feel truly
              connected to our donors.
            </div>
            <div className="testimonial-author">Maria Santos</div>
            <div className="testimonial-role">Village Leader, Guatemala</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-text">
              Seeing the GPS coordinates and photos of the school my donation
              helped build was incredible. I know exactly where my money went
              and the lives it touched.
            </div>
            <div className="testimonial-author">James Mitchell</div>
            <div className="testimonial-role">Monthly Donor</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
