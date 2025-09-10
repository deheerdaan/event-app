/* eslint-env node */
/* eslint-disable no-console, eqeqeq */
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('backend_data/events.json');
const middlewares = jsonServer.defaults();

// Store original data to preserve ID types
let originalData = null;

// Load original data on startup
const dataFile = path.join(__dirname, 'backend_data/events.json');

function loadOriginalData() {
  try {
    originalData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    console.log('📄 Original data loaded');
  } catch (error) {
    console.error('❌ Error loading original data:', error);
  }
}

// Load data on startup
loadOriginalData();

// Middleware to preserve numeric ID types
server.use(jsonServer.bodyParser);

// Intercept all write operations (POST, PUT, PATCH, DELETE)
server.use((req, res, next) => {
  // Store the original response.json function
  const originalJson = res.json;
  
  res.json = function(data) {
    // After JSON Server processes the request, fix the ID types
    setTimeout(() => {
      try {
        const currentData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const fixedData = preserveNumericIds(currentData, originalData);
        
        // Only write if there were changes
        if (JSON.stringify(fixedData) !== JSON.stringify(currentData)) {
          fs.writeFileSync(dataFile, JSON.stringify(fixedData, null, 2));
          console.log('🔧 Fixed numeric IDs in database');
          originalData = fixedData; // Update our reference
        }
      } catch (error) {
        console.error('❌ Error preserving numeric IDs:', error);
      }
    }, 100); // Small delay to ensure JSON Server has written the file
    
    return originalJson.call(this, data);
  };
  
  next();
});

// Function to preserve numeric ID types
function preserveNumericIds(newData, originalData) {
  if (!originalData) {
    return newData;
  }

  const fixed = { ...newData };
  
  // Fix users
  if (fixed.users && originalData.users) {
    fixed.users = fixed.users.map(user => {
      const original = originalData.users.find(u => u.id == user.id);
      if (original && typeof original.id === 'number') {
        return { ...user, id: Number(user.id) };
      }
      // Keep new numeric IDs as numbers
      if (typeof user.id === 'number') {
        return user;
      }
      // Try to convert string IDs to numbers if they're valid numbers
      const numId = parseInt(user.id, 10);
      if (!isNaN(numId)) {
        return { ...user, id: numId };
      }
      return user;
    });
  }
  
  // Fix categories
  if (fixed.categories && originalData.categories) {
    fixed.categories = fixed.categories.map(cat => {
      const original = originalData.categories.find(c => c.id == cat.id);
      if (original && typeof original.id === 'number') {
        return { ...cat, id: Number(cat.id) };
      }
      // Keep new numeric IDs as numbers
      if (typeof cat.id === 'number') {
        return cat;
      }
      // Try to convert string IDs to numbers if they're valid numbers
      const numId = parseInt(cat.id, 10);
      if (!isNaN(numId)) {
        return { ...cat, id: numId };
      }
      return cat;
    });
  }
  
  // Fix events
  if (fixed.events && originalData.events) {
    fixed.events = fixed.events.map(event => {
      const original = originalData.events.find(e => e.id == event.id);
      let fixedEvent = { ...event };
      
      // Fix main ID
      if (original && typeof original.id === 'number') {
        fixedEvent.id = Number(event.id);
      } else if (typeof event.id === 'number') {
        // Keep new numeric IDs
        fixedEvent.id = event.id;
      } else {
        // Try to convert string ID to number
        const numId = parseInt(event.id, 10);
        if (!isNaN(numId)) {
          fixedEvent.id = numId;
        }
      }
      
      // Fix createdBy - always try to keep as number
      if (fixedEvent.createdBy !== null && fixedEvent.createdBy !== undefined) {
        if (typeof fixedEvent.createdBy === 'string') {
          const numCreatedBy = parseInt(fixedEvent.createdBy, 10);
          if (!isNaN(numCreatedBy)) {
            fixedEvent.createdBy = numCreatedBy;
          }
        }
      }
      
      // Fix categoryIds - always convert to numbers
      if (fixedEvent.categoryIds && Array.isArray(fixedEvent.categoryIds)) {
        fixedEvent.categoryIds = fixedEvent.categoryIds.map(id => {
          if (typeof id === 'number') {
            return id;
          }
          const numId = parseInt(id, 10);
          return !isNaN(numId) ? numId : id;
        });
      }
      
      return fixedEvent;
    });
  }
  
  return fixed;
}

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
  console.log('🔢 Numeric ID preservation enabled');
  console.log('📁 Watching: backend_data/events.json');
});
