import React from 'react';

type Order = {
  id: string;
  date: string;
  total: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
};

const mockOrders: Order[] = [
  { id: '1001', date: '2026-06-01', total: '$49.99', status: 'Delivered' },
  { id: '1002', date: '2026-06-05', total: '$19.50', status: 'Shipped' },
  { id: '1003', date: '2026-06-10', total: '$5.00', status: 'Pending' },
];

const statusColor = (status: Order['status']) => {
  switch (status) {
    case 'Delivered':
      return '#16a34a';
    case 'Shipped':
      return '#0ea5e9';
    case 'Pending':
      return '#f59e0b';
    case 'Canceled':
      return '#ef4444';
  }
};

const MyOrders: React.FC = () => {
  return (
    <div style={{ padding: 20, fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>My Orders</h1>
      <p style={{ color: '#6b7280', marginTop: 0 }}>A simple list of your recent orders.</p>

      <div style={{ marginTop: 16 }}>
        {mockOrders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {mockOrders.map((o) => (
              <li
                key={o.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>Order #{o.id}</div>
                  <div style={{ color: '#6b7280', fontSize: 13 }}>{o.date}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600 }}>{o.total}</div>
                  <div style={{ marginTop: 6 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: 9999,
                        background: `${statusColor(o.status)}22`,
                        color: statusColor(o.status),
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
