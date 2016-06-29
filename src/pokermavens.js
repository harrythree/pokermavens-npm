var req = require('../src/req');
var _ = require('underscore');
var accounts = ['AccountsAdd', 'AccountsDecBalance', 'AccountsDelete', 'AccountsEdit', 'AccountsGet', 'AccountsIncBalance', 'AccountsList', 'AccountsPassword', 'AccountsPermission', 'AccountsSessionKey', 'AccountsTicket'];
var blacklist = ['BlacklistAdd', 'BlacklistDelete', 'BlacklistEdit', 'BlacklistGet', 'BlacklistList'];
var connections = ['ConnectionsGet', 'ConnectionsList', 'ConnectionsMessage', 'ConnectionsTerminate'];
var logs = ['LogsAddEvent', 'LogsError', 'LogsEvent', 'LogsHandHistory', 'LogsLobbyChat'];
var ringGames = ['RingGamesAdd', 'RingGamesDelete', 'RingGamesEdit', 'RingGamesGet', 'RingGamesList', 'RingGamesMessage', 'RingGamesOffline', 'RingGamesOnline', 'RingGamesOpen', 'RingGamesPause', 'RingGamesPlaying', 'RingGamesResume', 'RingGamesWaiting'];
var system = ['SystemAccount', 'SystemBalance', 'SystemGet', 'SystemSet', 'SystemLobbyMessage', 'SystemReboot', 'SystemStats'];
var tournaments = ['TournamentsAdd', 'TournamentsDelete', 'TournamentsEdit', 'TournamentsGet', 'TournamentsList', 'TournamentsMessage', 'TournamentsOffline', 'TournamentsOnline', 'TournamentsOpen', 'TournamentsPause', 'TournamentsPlaying', 'TournamentsRegister', 'TournamentsRemoveNoShows', 'TournamentsResults', 'TournamentsResume', 'TournamentsStart', 'TournamentsStats', 'TournamentsUnregister', 'TournamentsWaiting'];
var commands = accounts.concat(blacklist, connections, logs, ringGames, system, tournaments);
var zipCommands = ['AccountsList','BlacklistList','ConnectionsList','RingGamesList','RingGamesPlaying','TournamentsList','TournamentsPlaying','TournamentsResults'];

function PM(config) {
  var methods = {};
  _.each(commands, function(com) {
    methods[com] = function(params) {
      return commandRequest(config, com, params);
    }
  });
  return methods;
}

module.exports = PM;

function commandRequest(config, command, params) {
  var form = _.extend({Command: command}, params);

  if (_.contains(zipCommands, command)) {
    return req(form, config).then(zipObj);
  } else {
    return req(form, config);
  }
}

function zipObj(body) {
	var obj = _.pick(body, function(value, key, object) { return _.isArray(value) });
	var keys = _.keys(obj);
	var values = _.map(keys, function(k) { return obj[k]; });
	var valueSlices = _.zip.apply(_, values);
	return _.map(valueSlices, _.partial(_.object, keys));
}
