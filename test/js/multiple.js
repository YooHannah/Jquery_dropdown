describe("selects", function() {
     var select = false;
     var count = 0;
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/html';
    loadFixtures('multiple.html');
    select = $('select');
    select.Dropdown();
    select.change(function(){
      count++
    })
  });
    it('test init', function() {
        select.data('value').should.equal('');
        select.css('display').should.equal('none');
        select.next().hasClass('ui-select').should.equal(true);
        $('.ui-select').hasClass('Multiple').should.equal(true);
        $('.ui-select').hasClass('active').should.equal(false);
    });
     it('test button click', function() {
        $('.ui-select-button').click();
        $('.ui-select').hasClass('active').should.equal(true);
        $('.ui-select-button').click();
        $('.ui-select').hasClass('active').should.equal(false);
      });
      it('test single item click', function() {
        $('.ui-select-button').click();
        $('.ui-select-datalist-li').eq(1).click();
        $('.ui-select-datalist-li').eq(1).hasClass('selected').should.equal(true);
        $('.ui-select').hasClass('active').should.equal(true);
        select.data('value').length.should.equal(1)
        $('.ui-select-text').text().should.equal('夕阳');
        $('.ui-select-datalist-li').eq(1).click();
        $('.ui-select-datalist-li').eq(1).hasClass('selected').should.equal(false);
        $('.ui-select').hasClass('active').should.equal(true);
        select.data('value').length.should.equal(0);
        $('.ui-select-text').text().should.equal('请选择');
      });
       it('test multiple items click', function() {
          $('.ui-select-button').click();
          $('.ui-select').hasClass('active').should.equal(true);
          $('.ui-select-datalist-li').eq(1).click();
          $('.ui-select-datalist-li').eq(2).click();
          $('.ui-select-datalist-li').eq(3).click();
          select.data('value').length.should.equal(3);
          $('.ui-select-text').text().should.equal('夕阳、老树、昏鸦');
          $('.ui-select-datalist-li').eq(2).click();
          select.data('value').length.should.equal(2);
          $('.ui-select-text').text().should.equal('夕阳、昏鸦');
       })
        it('test close list and change event', function() {
           $('.ui-select-button').click();
           $('.ui-select').hasClass('active').should.equal(true);
           $('.ui-select-datalist-li').eq(1).click();
           $('.ui-select-datalist-li').eq(2).click();
           select.data('value').length.should.equal(2);
           $('.ui-select-button').click();
           $('.ui-select').hasClass('active').should.equal(false);
           select.data('value').length.should.equal(2);
           $('.ui-select-text').text().should.equal('夕阳、老树');
           count.should.equal(1);

           $('.ui-select-button').click();
           $('.ui-select-datalist-li').eq(1).hasClass('selected').should.equal(true);
           $('.ui-select-datalist-li').eq(2).hasClass('selected').should.equal(true);
           $('.ui-select-datalist-li').eq(2).click();
           $('.ui-select-text').text().should.equal('夕阳');
           select.data('value').length.should.equal(1);
           $('*').not('.ui-select-datalist').click();
           $('.ui-select').hasClass('active').should.equal(false);
           count.should.equal(2);

          $('.ui-select-button').click();
          $('.ui-select-datalist-li').eq(1).click();
          $('.ui-select-datalist-li').eq(1).click();
          $('.ui-select-button').click();
           count.should.equal(2);
        })


 });