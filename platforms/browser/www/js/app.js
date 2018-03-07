function calculate () {
  var form = document.forms['form'];
  var secform = document.forms['secpage'];
  var s = form.elements['square'].value;
  var v = form.elements['volume'].value;
  var a = form.elements['asquare'].value;
  var h = form.elements['height'].value;
  var t0 = form.elements['temperature'].value;


  var pi1 = 0;
  var pi2 = 0;
  var airwood = 0;
  var airplastic = 0;
  var qwood = 0;
  var qplastic = 0;
  var nwood = 0;
  var nplastic = 0;

  if (document.getElementById('wood').checked) {
    pi1 = secform.elements['wood1'].value;
    pi1++;
    pi1--;
    airwood = 4.2;
    qwood = 13.8;
    nwood = 2.4;
  }
  if (document.getElementById('plastic').checked) {
    pi2 = secform.elements['plastic1'].value;
    pi2++;
    pi2--;
    airplastic = 12;
    qplastic = 42;
    nplastic = 2.8;
  }


  t0++;
  t0 += 272;

  var v0 = (pi1 * airwood + pi2 * airplastic) / (pi1 * pi2);

  var continuity = a * Math.sqrt(h) / s;
  var qkr = (4500 * Math.pow(continuity, 3)/(1 + 500 * Math.pow(continuity, 3))) + (Math.pow(v, 0.333)/(6 * v0));
  var qk = (pi1 * qwood + pi2 * qplastic) / ((6 * Math.pow(v, 0.667) - a) * qwood);
  var q = (pi1 + pi2) / s;
  var tmax;
  var t1max;
  if(qk <= qkr) {
    tmax = 224 * Math.pow(qk, 0.528) + t0;
  } else {
    tmax = 940 * Math.pow(Math.E, 4.7 * (q - 30) / 1000);
  }
  t1max = (pi1 * qwood + pi2 * qplastic) * 2.4 * (pi1 + pi2) / (6285 * a * Math.sqrt(h) * (pi1 * nwood + pi2 * nplastic));

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
    var result = (tmax - t0) * 115.6 * Math.pow((tstep / (t1max)), 4.75) * Math.pow(Math.E, -4.75 * (tstep / (t1max)));
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
  document.getElementById('secpage').setAttribute('hidden', 'hidden');

}

function getBack() {
  document.getElementById('res').setAttribute('hidden', 'hidden');
  document.getElementById('form').removeAttribute('hidden');
}

function nextPage() {
  document.getElementById('secpage').removeAttribute('hidden');
  document.getElementById('form').setAttribute('hidden', 'hidden');
}

function toggle(checkboxID, toggleID) {
  var checkbox = document.getElementById(checkboxID);
  var toggle = document.getElementById(toggleID);

  checkbox.checked ?
    document.getElementById(toggleID).removeAttribute('hidden') :
    document.getElementById(toggleID).setAttribute('hidden', 'hidden');
}
