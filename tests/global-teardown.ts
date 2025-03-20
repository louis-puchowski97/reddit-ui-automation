async function globalTeardown() {
    console.log('Running Global Teardown...');

    
    
    if (globalThis.__BROWSER__) {
      await globalThis.__BROWSER__.close();
      console.log('Browser closed.');
    }
}

export default globalTeardown;