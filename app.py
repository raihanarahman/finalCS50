from flask import Flask, render_template

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Creates a simple flask backend to host our website by using render_template(). 
@app.route("/")
def index():
    return render_template("index.html")
