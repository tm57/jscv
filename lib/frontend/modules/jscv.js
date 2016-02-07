/**
 * Created by Tinashe Matate on 15/01/16.
 */

function jscv (jsonData) {

    this.jscvAggregateSectionData = function(jsonData, sectionHeading){
        var result = [];
        var data = jsonData.records.sections;
        for(var i = 0; i < data.length;i++){
            if(data[i].section_heading === sectionHeading){
                result.push(data[i]);
            }
        }
        return result;
    }
    this.firstName = jsonData.records.user.first_name;
    this.lastName = jsonData.records.user.last_name;
    this.middleName = jsonData.records.user.middle_name;
    this.avatar = jsonData.records.user.avatar;
    this.email = jsonData.records.user.email;
    this.phoneNumber = jsonData.records.user.phone_number;
    this.cellPhoneNumber = jsonData.records.user.phone_number;
    this.physicalAddress = jsonData.records.user.physical_address;
    this.dateOfBirth = jsonData.records.user.dateOfBirth;
    this.workExperience = this.jscvAggregateSectionData(jsonData, "workExperience");
    this.education = this.jscvAggregateSectionData(jsonData, "Education");
    this.extracurricularActivities = this.jscvAggregateSectionData(jsonData, "extraCurricularActivities");
    this.skillsAndAchievements = this.jscvAggregateSectionData(jsonData, "skillsAndAchievements");
    this.page = new jscvRenderGeneral();

    this.getName = function(){
        return this.firstName + " " + this.lastName;
    }

    this.getAddressLine = function(){
        return this.physicalAddress + '\n' + this.cellPhoneNumber + '\n' + this.email;
    }

    this.jscvPrepareMarkUp = function(){
        this.page.addSectionHeading(15, this.getName(), 20, 'Times', 'Roman').
            addTextGeneral(this.getAddressLine(), 21).
            addImage(this.avatar, 150, 8).
            addSection(45, 'Education', 14, 'Times', 'Roman', this.education).
            addSection(this.page.jscvRunningHeight+20, 'Experience', 14, 'Times', 'Roman', this.workExperience).
            addSection(this.page.jscvRunningHeight+20, 'Extra Curricular Activities', 14, 'Times', 'Roman', this.extracurricularActivities).
            addSection(this.page.jscvRunningHeight+20, 'Skills and Achievements', 14, 'Times', 'Roman', this.skillsAndAchievements).
            page.save(this.firstName+"_CV.pdf");
    }
}