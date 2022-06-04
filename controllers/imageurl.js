const handleApiCall = (req, res, appClarifai) => {
  appClarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

export { handleApiCall as default };
