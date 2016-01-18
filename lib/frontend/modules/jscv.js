/**
 * Created by Tinashe Matate on 15/01/16.
 */

function jscv (jsonData) {
    this.firstName = jsonData.firstName;
    this.lastName = jsonData.lastName;
    this.middleName = jsonData.middleName;
    this.avatar = jsonData.avatar;
    this.email = jsonData.email;
    this.phoneNumber = jsonData.phoneNumber;
    this.cellPhoneNumber = jsonData.cellPhoneNumber;
    this.physicalAddress = jsonData.physicalAddress;
    this.dateOfBirth = jsonData.dateOfBirth;
    this.workExperience = jsonData.workExperience;
    this.education = jsonData.education;
    this.extracurricularActivities = jsonData.extracurricularActivities;
    this.skillsAndAchievements = jsonData.skillsAndAchievements;
    this.page = new jscvRenderGeneral();

    this.getName = function(){
        return this.firstName + " " + this.lastName;
    }

    this.getAddressLine = function(){
        return this.physicalAddress + '\n' + this.cellPhoneNumber + '\n' + this.email;
    }

    this.jscvRenderEngineGeneral = function(){
            this.page.save(this.firstName);
    }

    this.jscvPrepareMarkUp = function(){
        this.page.addSectionHeading(15, this.getName(), 30, 'Times', 'Roman').addTextGeneral(this.getAddressLine(),20).
            addSection(45, 'Education', 14, 'Helvetica', 'BoldOblique', this.education).
            addSection(this.page.jscvRunningHeight+20, 'Experience', 14, 'Helvetica', 'BoldOblique', this.workExperience).
            addSection(this.page.jscvRunningHeight+20, 'Skills and Achievements', 14, 'Helvetica', 'BoldOblique', this.skillsAndAchievements).
            addSection(this.page.jscvRunningHeight+20, 'Extra Curricular Activities', 14, 'Helvetica', 'BoldOblique', this.extracurricularActivities).
            page.save(this.firstName+"_CV.pdf");
    }
}