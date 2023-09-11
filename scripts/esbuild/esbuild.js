import esbuild from 'esbuild';

export default config => async options => {
  if (!options.watch) return esbuild.build(config);

  const context = await esbuild.context(config);
  return context.watch();
};
