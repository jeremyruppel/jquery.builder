describe( 'builder syntax', function( )
{  
  describe( 'when calling build', function( )
  {
    it( 'should execute the build block', function( )
    {
      var block = jasmine.createSpy( );

      $( '#test' ).build( block );

      expect( block ).toHaveBeenCalled( );
    } );

    it( 'should execute the build block in the scope of a builder', function( )
    {
      var block = jasmine.createSpy( );

      $( '#test' ).build( block );

      expect( block.mostRecentCall.object.h1 ).toBeDefined( );
    } );

    it( 'should pass the builder to the build block as well', function( )
    {
      var block = jasmine.createSpy( );

      $( '#test' ).build( block );

      expect( block.mostRecentCall.args[ 0 ].h1 ).toBeDefined( );
    } );

    it( 'should be the same builder, its just whatever you like better', function( )
    {
      var block = jasmine.createSpy( );

      $( '#test' ).build( block );

      expect( block.mostRecentCall.args[ 0 ] ).toEqual( block.mostRecentCall.object );
    } );
  } );
  
  describe( 'when inside the builder context', function( )
  { 
    describe( 'the builder object', function( )
    {
      it( 'should have a tags property', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.tags ).toBeDefined( );
        } );
      } );
      
      it( 'should contain a few standard tags', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.tags ).toContain( 'h1' );
          expect( this.tags ).toContain( 'h2' );
          expect( this.tags ).toContain( 'h3' );
          expect( this.tags ).toContain( 'div' );
          expect( this.tags ).toContain( 'span' );
        } );
      } );
      
      it( 'should let the user add tags by passing a string to the build method', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.tags ).not.toContain( 'custom' );
        } );
        
        $( '#test' ).build( 'custom' );
        
        $( '#test' ).build( function( )
        {
          expect( this.tags ).toContain( 'custom' );
        } );
      } );
      
      it( 'should let the user clear the custom tags by passing null to the build method', function( )
      {
        $( '#test' ).build( 'custom' );
        
        $( '#test' ).build( function( )
        {
          expect( this.tags ).toContain( 'custom' );
        } );
        
        $( '#test' ).build( false );
        
        $( '#test' ).build( function( )
        {
          expect( this.tags ).not.toContain( 'custom' );
        } );
      } );
      
      it( 'should then have a custom method', function( )
      {
        $( '#test' ).build( 'custom' );
        
        $( '#test' ).build( function( )
        {
          this.custom( 'awesome sauce' );
        } );
        
        expect( $( '#test' ).html( ) ).toEqual( '<custom>awesome sauce</custom>' );
      } );
      
      it( 'should not allow the user to overwrite the build method', function( )
      {
        expect( function( )
        {
          $( '#test' ).build( 'build' );
        }
        ).toThrow( "jquery.builder: cannot add method 'build' to builder because it is already defined" );
      } );
      
      it( 'should not allow the user to overwrite the text method', function( )
      {
        expect( function( )
        {
          $( '#test' ).build( 'text' );
        }
        ).toThrow( "jquery.builder: cannot add method 'text' to builder because it is already defined" );
      } );
    } );
    
    describe( 'chaining tag methods', function( )
    {
      it( 'should return itself from any build method', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.h1( ) ).toBe( this );
        } );
      } );
      
      it( 'should be able to chain methods by returning itself', function( )
      {
        $( '#test' ).build( function( )
        {
          var one = this.h1( );
          var two = one.div( );
          
          expect( this ).toBe( one );
          expect( one ).toBe( two );
          expect( two ).toBe( this );
        } );
      } );
      
      it( 'should be able to nest blocks in the tag methods', function( )
      {
        var block = jasmine.createSpy( );
        
        $( '#test' ).build( function( )
        {
          this.h1( block );
        } );
        
        expect( block ).toHaveBeenCalled( );
      } );
    } );
    
    describe( 'builder scope', function( )
    {
      it( 'should have a scope property', function( )
      {
        var selector = $( '#test' );
        
        selector.build( function( )
        {
          expect( this.scope ).toBe( selector );
        } );
      } );
      
      it( 'should change the scope for nested blocks', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.scope.selector ).toEqual( '#test' );
          
          this.h1( function( )
          {
            expect( this.scope[0].outerHTML ).toEqual( '<h1></h1>' );
          } );
        } );
      } );
      
      it( 'should change the scope back after a nested block', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.scope.selector ).toEqual( '#test' );
          
          this.h1( function( )
          {
            expect( this.scope[0].outerHTML ).toEqual( '<h1></h1>' );
          } );
          
          expect( this.scope.selector ).toEqual( '#test' );
        } );
      } );
      
      it( 'should maintain scope even if youre doing something crazy', function( )
      {
        $( '#test' ).build( function( )
        {
          expect( this.scope.selector ).toEqual( '#test' );
          
          this.div( function( )
          {
            expect( this.scope[0].outerHTML ).toEqual( '<div></div>' );
            
            this.div( function( )
            {
              expect( this.scope[0].outerHTML ).toEqual( '<div></div>' );
              
              this.div( function( )
              {
                expect( this.scope[0].outerHTML ).toEqual( '<div></div>' );
              } );
              
              expect( this.scope[0].outerHTML ).toEqual( '<div><div></div></div>' );
            } );
            
            expect( this.scope[0].outerHTML ).toEqual( '<div><div><div></div></div></div>' );
          }
          ).div( 'text' ).h1( function( )
          {
            expect( this.scope[0].outerHTML ).toEqual( '<h1></h1>' );
          } );
          
          expect( this.scope.selector ).toEqual( '#test' );
        } );
      } );
    } );
    
  } );
  
} );