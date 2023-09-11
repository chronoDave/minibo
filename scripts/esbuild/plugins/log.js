module.exports = name => ({
  name,
  setup: build => {
    build.onStart(() => {
      console.log(`[esbuild] building ${name}...`);
      console.time(`[esbuild] built ${name} in`);
    });
    build.onEnd(() => {
      console.timeEnd(`[esbuild] built ${name} in`);
    });
  }
});
