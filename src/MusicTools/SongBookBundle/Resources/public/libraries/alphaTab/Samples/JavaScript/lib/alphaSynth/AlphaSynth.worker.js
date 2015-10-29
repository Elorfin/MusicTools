self.onmessage = function(e) {
    if(e.data.cmd == "playerReady") {
        importScripts(e.data.root + "alphaSynth.js");
        //debugger;
        new AlphaSynth.Main.AlphaSynthWebWorker(self);
    }
}