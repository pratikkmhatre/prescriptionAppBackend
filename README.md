# prescriptionAppBackend.

Patient routes

router.post("/signup"); //new registration

router.post("/login"); //login patient

router.get("/dashboard"); //data on patient dashboard -all the doctors list

router.post("/newconsultation/:doctorId"); //creating new consultation

router.get("/details/:id"); //getting patient details


Doctor routes

router.post("/signup"); //new doctor registration

router.post("/login"); //doctor login

router.get("/consultationlist/:id"); //showing all consultation list

router.get("/getdetails/:id"); //get doctor details
