const defaultOptions = {
  elem: document.body,
  debugElem: 'font-size-debug',
  showBreakKey: 's',
  breakKey: 'f',
  hideBreakKey: 'h',
};


export default class FontSizeDebug {
  constructor(options) {
    this._options = this._getElem(options);
    this._elem;
    this._map = {};
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  // Public
  init() {
    this._render();
  }

  getElem() {
    if (!this._elem) this._render();

    return this._elem;
  }

  showFontSize() {
    this._elem.classList.add(this._options.debugElem);
    this._clearMap();
    event.preventDefault();

    return;
  }

  hideFontSize() {
    this._elem.classList.remove(this._options.debugElem);
    this._clearMap();
    event.preventDefault();

    return;
  }

  // Private
  _render() {
    this._elem = this._options.elem;
    this._elem.addEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown(event) {
    this._map[event.key] = event.type === 'keydown';
    const showBreakKey = this._map[this._options.showBreakKey];
    const hideBreakKey = this._map[this._options.hideBreakKey];
    const breakKey = this._map[this._options.breakKey];

    if (showBreakKey && breakKey) this.showFontSize();
    if (hideBreakKey && breakKey) this.hideFontSize();
  }

  _getElem(options) {
    return Object.assign({}, defaultOptions, options);
  }

  _clearMap() {
    this._map = {};
  }
}