exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
  };
  
  exports.guideBoard = (req, res) => {
    res.status(200).send("Guide Content.");
  };
  
  exports.hodBoard = (req, res) => {
    res.status(200).send("HOD Content.");
  };

  exports.directorBoard = (req, res) => {
    res.status(200).send("Director Content.");
  };
  