module.exports = function(callback) {
  // PUBLIC
  this.isLandscape = () => window.innerWidth > window.innerHeight;
  // bottom bar is shown in portrait when documentElement client height is
  // equal to window innerHeight. cf. http://ryanve.com/lab/dimensions/
  this.getBottomBarVisibility = () => !this.isLandscape() && document.documentElement.clientHeight === window.innerHeight;
  this.destroy = () => window.removeEventListener('resize', listener);

  // PRIVATE
  let bottomBarVisible = this.getBottomBarVisibility();
  const listener = window.addEventListener('resize', event => {
    // invoke callback if bottom bar visibility has changed
    if (bottomBarVisible !== this.getBottomBarVisibility()) {
      bottomBarVisible = this.getBottomBarVisibility();
      callback(bottomBarVisible);
    }
  });
}