from flask import Flask, render_template, request
from black_scholes import black_scholes

app = Flask(__name__)



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        S = float(request.form['S'])
        K = float(request.form['K'])
        r = float(request.form['r'])
        T = float(request.form['T'])
        sigma = float(request.form['sigma'])
        option_type = request.form['option_type']
        price = black_scholes(S, K, r, T, sigma, option_type)
        return f'{option_type.capitalize()} Option Price: {price:.2f}'
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
