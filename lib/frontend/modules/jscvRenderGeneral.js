function jscvRenderGeneral(){
    this.page = new jsPDF();
    this.margin = 25;
    this.image = 'Not Set';
    this.subSectionFontSize = 12;
    this.subsectionFont = 'Times';
    this.subSectionFontType = 'Bold';
    this.marginMid = 80;
    this.jscvRunningHeight = 0;


    this.addSectionHeading = function(jscvHeight, jscvTitle, jscvFontSize, jscvFont, jscvFontType, optionMargin){
        this.page.setFontSize(jscvFontSize);
        this.page.setFont(jscvFont, jscvFontType);
        if(typeof optionMargin === 'number'){
            this.page.text(optionMargin, jscvHeight, jscvTitle);
        }else{
            this.page.text(this.margin, jscvHeight, jscvTitle);
        }
        return this;
    }

    this.addImage = function(url, positionX, positionY){
        this.page.addImage(url, 'png', positionX, positionY);
        return this;
    }

    this.addLine = function(positionX, positionY, lineLength, vertical){
        if(vertical !== true){
            this.page.line(positionX, positionY, positionX + lineLength, positionY);
        }else{
            this.page.line(positionX, positionY, positionX , positionY + lineLength);
        }
        return this;
    }

    this.addSection = function(jscvHeight, jscvTitle, jscvFontSize, jscvFont, jscvFontType, sectionContent){
        this.page.setTextColor(105, 105, 105);
        this.addLine(this.margin, jscvHeight, this.margin * 2);
        this.addSectionHeading(jscvHeight, jscvTitle, jscvFontSize, jscvFont, jscvFontType, this.marginMid);
        this.page.setTextColor(0, 0, 0);
        jscvHeight+=10;
        var arrayLength = sectionContent.length;
        if(arrayLength >= 1){
            this.makeSubSection(sectionContent[0], jscvHeight);
        }
        for (var i = 1; i < arrayLength; i++) {
                jscvHeight+=20;
                this.makeSubSection(sectionContent[i], jscvHeight);
        }
        this.jscvRunningHeight = jscvHeight;
        return this;
    }

    this.makeSubSection = function(sectionContentSingle, textHeight){
        var firstLine = sectionContentSingle.start_date + " - " + sectionContentSingle.end_date;
        var detail = sectionContentSingle.description;
        this.addSectionHeading(textHeight, firstLine, this.subSectionFontSize, this.subsectionFont, this.subSectionFontType);
        this.addSectionHeading(textHeight, sectionContentSingle.subsection_heading, this.subSectionFontSize, this.subsectionFont, this.subSectionFontType, this.marginMid);
        this.addTextGeneral(detail, textHeight + 8, this.marginMid);

    }

    this.addTextGeneral = function(text, textHeight, textMarginLeft ){
        this.page.setFontSize(10);
        this.page.setFont('times', 'normal');
        text = this.jscvTextFormatter(text);
        if(typeof textMarginLeft === 'number'){
            this.page.text(textMarginLeft, textHeight, text);
        }else{
            this.page.text(this.margin, textHeight, text);
        }
        return this;
    }

    this.jscvTextFormatter = function(sectionDetailedDescription){
        return this.page.splitTextToSize(sectionDetailedDescription, 100);
    }
}