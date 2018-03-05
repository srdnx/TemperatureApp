function calculate () {
  var form = document.forms['form'];
  var s = form.elements['square'].value;
  var v = form.elements['volume'].value;
  var a = form.elements['asquare'].value;
  var h = form.elements['height'].value;
  var t0 = form.elements['temperature'].value;
  var pi = form.elements['load'].value;
  var v0 = form.elements['airvolume'].value;
  var qn = form.elements['burn'].value;
  var ab = form.elements['aburn'].value;

  t0++;
  t0 += 272;

  var continuity = a * Math.sqrt(h) / s;
  var qkr = (4500 * Math.pow(continuity, 3)/(1 + 500 * Math.pow(continuity, 3))) + (Math.pow(v, 0.333)/(6 * v0));
  var qk = pi / (6 * Math.pow(v, 0.667) - a);
  var q = pi / s;
  var tmax;
  var t1max;
  if(qk <= qkr) {
    tmax = 224 * Math.pow(qk, 0.528) + t0;
  } else {
    tmax = 940 * Math.pow(Math.E, 4.7 * (q - 30) / 1000);
  }
  t1max = pi * qn * 2.4 / (6285 * a * Math.sqrt(h) * ab);

  var tstep = 0;
  t1max = t1max * 60;

  var beftemp = 0;
  var lasttemp = 0;

  var when100 = 0;
  var maxtemp = 0;
  var maxtime = 0;
  var checked = true;
  var whenmin100 = 0;

  for (var i = 0; i < 301; i++) {
    var result = (tmax - t0) * 115.6 * Math.pow((tstep / (t1max)), 4.75) * Math.pow(Math.E, -4.75 * (tstep / (t1max))) + t0 - 273;
    beftemp = lasttemp;
    lasttemp = result;

    if (beftemp < 100 && lasttemp >= 100) when100 = tstep;
    if (beftemp > lasttemp && checked) {
      maxtemp = result;
      maxtime = tstep;
      checked = false;
    }
    if (beftemp > 100 && lasttemp <= 100) whenmin100 = tstep;

    tstep += 1;
  }

  document.getElementById('when100').innerHTML = when100;
  document.getElementById('maxtemp').innerHTML = Math.ceil(maxtemp);
  document.getElementById('maxtime').innerHTML = maxtime;
  document.getElementById('whenmin100').innerHTML = whenmin100;

  document.getElementById('res').removeAttribute('hidden');
  document.getElementById('form').setAttribute('hidden', 'hidden');

}

function getBack() {
  document.getElementById('res').setAttribute('hidden', 'hidden');
  document.getElementById('form').removeAttribute('hidden');
}
