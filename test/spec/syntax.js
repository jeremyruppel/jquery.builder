describe( 'builder syntax', function( )
{
  // it( 'should look like this', function( )
  // {
  //   $( 'body' ).build( function( )
  //   {
  //     this.h1( function( )
  //     {
  //       this.text( 'Hello, this is builder in action' );
  //     }
  //     ).h2( 'test' ).div( function( )
  //     {
  //       
  //     } );
  //   } );
  // } );
  
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
    } );
    
  } );
  
} );