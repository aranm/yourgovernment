﻿if (!String.prototype.trim) {
   String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
}