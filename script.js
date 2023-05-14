//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.querySelector('main');
  for (let episode of episodeList) {
    let seasonTag = `S${episode.season.toString().padStart(2, '0')}E${episode.number.toString().padStart(2, '0')}`;
    let airDate = new Date(episode.airdate);

    let episodeDetails = document.createElement('episode-details');

    createSpanSlot(episodeDetails, "episode-name", episode.name);
    createSpanSlot(episodeDetails, "episode-season", seasonTag);
    createSpanSlot(episodeDetails, "episode-airdate", airDate.toLocaleDateString());
    createSpanSlot(episodeDetails, "episode-airtime", episode.airtime);
    createSpanSlot(episodeDetails, "episode-runtime", formatTime(episode.runtime));

    let summarySpan = document.createElement('span');
    summarySpan.innerHTML = episode.summary;
    summarySpan.slot = "episode-summary";
    episodeDetails.appendChild(summarySpan);

    let episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.slot = "episode-image";
    episodeDetails.appendChild(episodeImage);

    rootElem.appendChild(episodeDetails);
  }
}

function createSpanSlot(template, slot, text) {
  let spanElem = document.createElement('span');
  spanElem.textContent = text;
  spanElem.slot = slot;
  template.appendChild(spanElem);
}

function formatTime(mins) {
  if (mins >= 60) {
    let hours = Math.floor(mins / 60);
    let newMins = mins % 60;
    if (newMins > 0) {
      return `${formatHours(hours)} + ${formatMins(newMins)}`;
    }
    return formatHours(hours);
  }
  return formatMins(mins);
}

function formatHours(hours) {
  if (hours === 1) {
    return `${hours} hour`;
  }

  return `${hours} hours`;
}

function formatMins(mins) {
  if (mins === 1) {
    return `${mins} minute`;
  }

  return `${mins} minutes`;
}

window.onload = setup;
