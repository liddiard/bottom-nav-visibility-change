const ORIENTATION = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape'
};

module.exports = callback => {
  this.navVisible = true;
  this.orientation = getOrientation();
  this.updateVisiblity = updateVisiblity.bind(this);
  this.innerHeight = window.innerHeight;
  this.innerWidth = window.innerWidth;

  this.listener = window.addEventListener('resize', event => {
    // bottom bar is never visible in landscape
    if (getOrientation() === ORIENTATION.LANDSCAPE) {
      updateVisiblity(false, callback);
    }
    // otherwise we're in portrait; check if width remained constant
    else if (window.innerWidth === this.innerWidth) {
      // if new height is shorter, bottom bar has appeared
      if (window.innerHeight < this.innerHeight) {
        updateVisiblity(true, callback);
      }
      // otherwise it's disappeared
      else {
        updateVisiblity(false, callback);
      }
    }
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  });

  this.destroy = () => {
    window.removeEventListener('resize', this.listener);
  }
};

function getOrientation() {
  return window.innerHeight > window.innerWidth ? 
    ORIENTATION.PORTRAIT : 
    ORIENTATION.LANDSCAPE;
}

// update visibility state and invoke callback if state has changed
function updateVisiblity(value, callback) {
  if (value !== this.navVisible) {
    this.navVisible = value;
    callback(value);
  }
}