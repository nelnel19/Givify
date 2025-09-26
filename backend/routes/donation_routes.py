from flask import Blueprint, request, jsonify
from DonationModel import DonationModel

donation_routes = Blueprint("donation_routes", __name__)

@donation_routes.route("/donations", methods=["POST"])
def create_donation():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = [
            "user_email", "user_name", "campaign_id", "campaign_name",
            "payment_method", "card_number", "expiry_date", "cvv",
            "donation_amount", "age_requirement_accepted", "privacy_policy_accepted"
        ]
        
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create donation
        donation_id = DonationModel.create_donation(data)
        
        # Update campaign's collected amount
        DonationModel.update_campaign_collected_amount(
            data["campaign_id"], 
            data["donation_amount"]
        )
        
        return jsonify({
            "message": "Donation created successfully", 
            "id": donation_id
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@donation_routes.route("/donations/user/<email>", methods=["GET"])
def get_user_donations(email):
    try:
        donations = DonationModel.get_donations_by_user(email)
        return jsonify(donations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ NEW ROUTE - Fetch all donations
@donation_routes.route("/donations/all", methods=["GET"])
def get_all_donations():
    try:
        donations = DonationModel.get_all_donations()
        return jsonify(donations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
