import React, { useState, useEffect } from "react";
import "../styles/campaign.css";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  const calculateProgress = (goal, collected) => {
    return Math.min((collected / goal) * 100, 100);
  };

  return (
    <div className="campaign-wrapper">
      <h1 className="campaign-title">Active Campaigns</h1>

      <div className="campaign-list">
        {campaigns.map((campaign) => (
          <div className="campaign-card" key={campaign.id}>
            <img
              src={campaign.image}
              alt={campaign.title}
              className="campaign-image"
            />
            <div className="campaign-details">
              <h2>{campaign.title}</h2>
              <p className="campaign-description">{campaign.description}</p>

              <div className="campaign-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${calculateProgress(
                        campaign.goalAmount,
                        campaign.collectedAmount
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  ₱{campaign.collectedAmount.toLocaleString()} raised of ₱
                  {campaign.goalAmount.toLocaleString()}
                </p>
              </div>

              <button className="donate-button">Donate Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
