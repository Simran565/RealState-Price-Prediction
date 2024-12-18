import os
import sys
from flask import Flask, request, jsonify, render_template
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from Server import util



app = Flask(__name__, template_folder='../Client/template', static_folder='../Client/static')


@app.route('/')
def home():
    return render_template('app.html')

util.load_saved_artifacts()



@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))