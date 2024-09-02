from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)

# Load the trained model
with open('Temperature_prediction_project.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract features from the request
    hour = int(data['hour'])
    ws = float(data['ws'])
    rh = float(data['rh'])
    rain = int(data['rain'])

    # Predict using the loaded model
    prediction = model.predict([[hour, ws, rh, rain]])

    # Return the prediction as a JSON response
    return jsonify({'temperature': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
