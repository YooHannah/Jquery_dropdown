describe("selects", function() {
     var select = false;
     var count = 0;
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/html';
    loadFixtures('singleSearch.html');
    select = $('select');
    select.Dropdown();
    select.change(function(){
      count++
    })
  });
    it('test init', function() {
        select[0].value.should.equal('');
        select.css('display').should.equal('none');
        select.next().hasClass('ui-select').should.equal(true);
        $('.ui-select').hasClass('active').should.equal(false);
        $('.ui-select-datalist').children(':first').hasClass('ui-select-input').should.equal(true);
    });
     it('test button click', function() {
        $('.ui-select-button').click();
        $('.ui-select').hasClass('active').should.equal(true);
        $('.ui-select-button').click();
        $('.ui-select').hasClass('active').should.equal(false);
      });
      it('test item click and change event', function() {
        $('.ui-select-button').click();
        $('.ui-select-datalist-li').eq(1).click();
        $('.ui-select-datalist-li').eq(1).hasClass('selected').should.equal(true);
        $('.ui-select').hasClass('active').should.equal(false);
        $('.ui-select-text').text().should.equal('夕阳');
        count.should.equal(1)

        $('.ui-select-button').click();
        $('.ui-select-datalist-li').eq(1).hasClass('selected').should.equal(true);
        $('.ui-select-datalist-li').eq(1).click();
        $('.ui-select').hasClass('active').should.equal(false);
        count.should.equal(1)

        $('.ui-select-button').click();
        $('.ui-select-datalist-li').eq(1).hasClass('selected').should.equal(true);
        $('.ui-select-datalist-li').eq(2).click();
        $('.ui-select').hasClass('active').should.equal(false);
        count.should.equal(2)
      });

      it('test search', function() {
        var opts = $('.ui-select-datalist-li');
        var count = 0;
        var length = opts.length;

        $('.ui-select-input')[0].value = '11'
        $('input').trigger("input");
        for(var i=0;i<length;i++){
          if($(opts[i]).css('display') == 'none'){
            count++
          }
        }
        count.should.equal(opts.length);

        $('.ui-select-input')[0].value = ''
        $('input').trigger("input");
         count = 0;
        for(var i=0;i<length;i++){
          if($(opts[i]).css('display') == 'none'){
            count++
          }
        }
        count.should.equal(1);

         $('.ui-select-input')[0].value = '夕阳'
        $('input').trigger("input");
         count = 0;
        for(var i=0;i<length;i++){
          if($(opts[i]).css('display') == 'none'){
            count++
          }
        }
        count.should.equal(10);

        $('.ui-select-input')[0].value = '夕'
        $('input').trigger("input");
         count = 0;
        for(var i=0;i<length;i++){
          if($(opts[i]).css('display') == 'none'){
            count++
          }
        }
        count.should.equal(10);

      })

 });