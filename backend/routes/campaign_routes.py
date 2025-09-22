from flask import Blueprint, request, jsonify
from CampaignModel import CampaignModel

campaign_routes = Blueprint("campaign_routes", __name__)

# Get all campaigns
@campaign_routes.route("/campaigns", methods=["GET"])
def get_campaigns():
    campaigns = CampaignModel.get_all_campaigns()
    return jsonify(campaigns), 200

# Create a new campaign
@campaign_routes.route("/campaigns", methods=["POST"])
def create_campaign():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    goal_amount = data.get("goalAmount")
    image = data.get("image")

    if not title or not description or not goal_amount or not image:
        return jsonify({"error": "All fields are required"}), 400

    campaign_id = CampaignModel.create_campaign(title, description, goal_amount, image)
    return jsonify({"message": "Campaign created successfully", "id": campaign_id}), 201
