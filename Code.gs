/* Credit: +Jean-Pierre Verhulst */

function listFileRevisions(fileID) {

  var editList = [],
      revisions = Drive.Revisions.list(fileID);

  if (revisions.items && revisions.items.length > 0) {
    for (var i=0; i < revisions.items.length; i++) {
      var revision = revisions.items[i];
      editList.push([revision.id, (new Date(revision.modifiedDate)).toLocaleString(),
        revision.lastModifyingUserName, revision.lastModifyingUser.emailAddress
      ]);
    }
    Logger.log(editList);
  } else {
    Logger.log('No file revisions found.');
  }

}