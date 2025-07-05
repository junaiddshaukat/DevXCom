import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch
import numpy as np

def create_architecture_diagram():
    fig, ax = plt.subplots(1, 1, figsize=(16, 12))
    
    # Define layers
    layers = [
        {
            'name': 'Client Layer',
            'y': 9,
            'height': 1.5,
            'color': '#e3f2fd',
            'components': ['React SPA', 'Redux Store', 'React Router', 'Axios Client']
        },
        {
            'name': 'API Gateway',
            'y': 7,
            'height': 1,
            'color': '#f3e5f5',
            'components': ['CORS', 'Authentication', 'Rate Limiting']
        },
        {
            'name': 'Application Layer',
            'y': 5,
            'height': 1.5,
            'color': '#e8f5e8',
            'components': ['Express.js', 'Controllers', 'Business Logic', 'Validation']
        },
        {
            'name': 'Database Layer',
            'y': 3,
            'height': 1,
            'color': '#fff3e0',
            'components': ['MongoDB', 'Mongoose ODM', 'Models']
        },
        {
            'name': 'External Services',
            'y': 1,
            'height': 1,
            'color': '#ffebee',
            'components': ['Cloudinary', 'Stripe', 'Nodemailer', 'Socket.io']
        }
    ]
    
    # Draw layers
    for layer in layers:
        # Draw layer background
        layer_box = FancyBboxPatch((1, layer['y']), 12, layer['height'],
                                  boxstyle="round,pad=0.1",
                                  facecolor=layer['color'],
                                  edgecolor='black',
                                  linewidth=2)
        ax.add_patch(layer_box)
        
        # Add layer name
        ax.text(0.5, layer['y'] + layer['height']/2, layer['name'],
                ha='center', va='center', fontsize=12, fontweight='bold',
                rotation=90)
        
        # Add components
        component_width = 12 / len(layer['components'])
        for i, component in enumerate(layer['components']):
            x = 1.5 + i * component_width
            comp_box = FancyBboxPatch((x, layer['y'] + 0.2), component_width - 0.3, layer['height'] - 0.4,
                                     boxstyle="round,pad=0.05",
                                     facecolor='white',
                                     edgecolor='gray',
                                     linewidth=1)
            ax.add_patch(comp_box)
            ax.text(x + (component_width - 0.3)/2, layer['y'] + layer['height']/2, component,
                    ha='center', va='center', fontsize=9)
    
    # Draw arrows between layers
    for i in range(len(layers) - 1):
        y1 = layers[i]['y']
        y2 = layers[i+1]['y'] + layers[i+1]['height']
        
        # Draw multiple arrows
        for j in range(3):
            x = 3 + j * 3
            ax.annotate('', xy=(x, y2), xytext=(x, y1),
                        arrowprops=dict(arrowstyle='->', lw=2, color='blue'))
    
    # Add data flow indicators
    ax.text(14, 6, 'Data Flow', ha='center', va='center', fontsize=12, fontweight='bold',
            bbox=dict(boxstyle="round,pad=0.3", facecolor='lightgreen'))
    
    # Add security indicators
    ax.text(14, 4, 'Security\nLayers', ha='center', va='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", facecolor='lightcoral'))
    
    ax.set_xlim(0, 15)
    ax.set_ylim(0, 11)
    ax.axis('off')
    ax.set_title('E-Commerce Application - System Architecture', fontsize=16, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('ecommerce_architecture.png', dpi=300, bbox_inches='tight')
    plt.show()

if __name__ == "__main__":
    create_architecture_diagram()