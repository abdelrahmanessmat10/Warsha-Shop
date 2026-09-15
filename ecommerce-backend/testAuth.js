async function run() {
  try {
    console.log('1. Registering user...');
    let res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    let data = await res.json();
    console.log('Registered:', data);

    const token = data.token;

    console.log('\n2. Logging in...');
    res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    data = await res.json();
    console.log('Logged in:', data);

    console.log('\n3. Fetching cart items...');
    res = await fetch('http://localhost:3000/api/cart-items', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    data = await res.json();
    console.log('Cart Items:', data);

  } catch (err) {
    console.error('Error:', err);
  }
}

run();
