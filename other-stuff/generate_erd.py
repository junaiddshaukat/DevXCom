import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch
import matplotlib.lines as mlines

def create_erd():
    fig, ax = plt.subplots(1, 1, figsize=(20, 16))
    
    # Define entities and their positions
    entities = {
        'User': {'pos': (2, 12), 'fields': ['_id (PK)', 'name', 'email', 'password', 'phoneNumber', 'addresses', 'role', 'avatar']},
        'Shop': {'pos': (8, 12), 'fields': ['_id (PK)', 'name', 'email', 'password', 'phoneNumber', 'address', 'zipCode', 'avatar']},
        'Product': {'pos': (2, 8), 'fields': ['_id (PK)', 'name', 'description', 'category', 'originalPrice', 'discountPrice', 'stock', 'images', 'shopId (FK)']},
        'Event': {'pos': (8, 8), 'fields': ['_id (PK)', 'name', 'description', 'category', 'start_Date', 'Finish_Date', 'status', 'shopId (FK)']},
        'Order': {'pos': (14, 8), 'fields': ['_id (PK)', 'cart', 'shippingAddress', 'user (FK)', 'totalPrice', 'status', 'paymentInfo']},
        'OrderItem': {'pos': (14, 4), 'fields': ['_id (PK)', 'orderId (FK)', 'productId (FK)', 'eventId (FK)', 'quantity', 'price']},
        'CouponCode': {'pos': (2, 4), 'fields': ['_id (PK)', 'name', 'value', 'minAmount', 'maxAmount', 'shopId (FK)']},
        'Conversation': {'pos': (8, 4), 'fields': ['_id (PK)', 'members', 'lastMessage (FK)', 'lastMessageTime']},
        'Message': {'pos': (8, 0), 'fields': ['_id (PK)', 'conversationId (FK)', 'text', 'sender (FK)', 'images']},
        'Withdrawal': {'pos': (14, 12), 'fields': ['_id (PK)', 'seller (FK)', 'amount', 'status']},
        'Review': {'pos': (2, 0), 'fields': ['_id (PK)', 'user (FK)', 'product (FK)', 'rating', 'comment', 'images']}
    }
    
    # Draw entities
    for entity, data in entities.items():
        x, y = data['pos']
        fields = data['fields']
        
        # Calculate box height based on number of fields
        box_height = len(fields) * 0.3 + 0.5
        
        # Draw entity box
        box = FancyBboxPatch((x-1, y-box_height/2), 2, box_height,
                            boxstyle="round,pad=0.1",
                            facecolor='lightblue',
                            edgecolor='black',
                            linewidth=2)
        ax.add_patch(box)
        
        # Add entity name
        ax.text(x, y + box_height/2 - 0.2, entity, 
                ha='center', va='center', fontsize=12, fontweight='bold')
        
        # Add horizontal line
        ax.plot([x-0.9, x+0.9], [y + box_height/2 - 0.4, y + box_height/2 - 0.4], 'k-', linewidth=1)
        
        # Add fields
        for i, field in enumerate(fields):
            ax.text(x, y + box_height/2 - 0.7 - i*0.3, field, 
                    ha='center', va='center', fontsize=8)
    
    # Define relationships
    relationships = [
        ('User', 'Order', '1:M'),
        ('User', 'Review', '1:M'),
        ('User', 'Conversation', 'M:M'),
        ('Shop', 'Product', '1:M'),
        ('Shop', 'Event', '1:M'),
        ('Shop', 'CouponCode', '1:M'),
        ('Shop', 'Withdrawal', '1:M'),
        ('Shop', 'Conversation', 'M:M'),
        ('Order', 'OrderItem', '1:M'),
        ('Product', 'OrderItem', '1:M'),
        ('Event', 'OrderItem', '1:M'),
        ('Product', 'Review', '1:M'),
        ('Conversation', 'Message', '1:M'),
    ]
    
    # Draw relationships
    for rel in relationships:
        entity1, entity2, cardinality = rel
        x1, y1 = entities[entity1]['pos']
        x2, y2 = entities[entity2]['pos']
        
        # Draw line
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle='->', lw=1.5, color='red'))
        
        # Add cardinality label
        mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mid_x, mid_y, cardinality, ha='center', va='center', 
                fontsize=8, bbox=dict(boxstyle="round,pad=0.3", facecolor='yellow', alpha=0.7))
    
    ax.set_xlim(-1, 17)
    ax.set_ylim(-2, 14)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('E-Commerce Application - Entity Relationship Diagram', fontsize=16, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('ecommerce_erd.png', dpi=300, bbox_inches='tight')
    plt.show()

if __name__ == "__main__":
    create_erd()