async function createfish() {
    try {
        // Get form input values
        var hospitalname = document.getElementById("ikigo").value;
        var  names = document.getElementById("izina").value;
        var databirthday = document.getElementById("itarike").value;
        var fathername = document.getElementById("se").value;
        var  mathername = document.getElementById("nyina").value;
        var  village = document.getElementById("umudugudu").value;
        var  cell = document.getElementById("akagari").value;
        var  sector = document.getElementById("umurenge").value;
        var  district = document.getElementById("akarere").value;
        var  provance = document.getElementById("intara").value;
        var  vaccinationkind = document.getElementById("agree").value;
        var  date = document.getElementById("date").value;
        var  datotpExpiresAte = document.getElementById("otpExpiresAt").value;
        
        // Construct the user object to send to the server
        var user = {
            hospital_name: hospitalname,
            names: names,
            data_birthday:databirthday,
            father_name: fathername,
            mather_name: mathername,
            village: village,
            cell: cell,
            sector: sector,
            district: district,
            provance: provance,
            vaccination_kind: vaccinationkind,
            date: date,
            role:user,
            otpExpiresAt: datotpExpiresAte,
        };

        console.log("Signup data:",hospitalname,names,databirthday,fathername,mathername,village,cell,sector,district,provance,vaccinationkind,date,datotpExpiresAte);

        // Make the POST request to the server
        const apiUrl = "http://localhost:5000/api/ifish/post";
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Failed to register user. Status: ${response.status}`);
        }

        console.log("User registered successfully!");
        // document.getElementById("reg-success").textContent = "Signup successful!";
   
    
    } catch (error) {
        console.error("Error during signup:", error);
        // document.getElementById("reg-success").textContent = "Error during signup: " + error.message;
    }

}
