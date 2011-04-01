describe( 'building nodes', function( )
{
  describe( 'node hierarchy', function( )
  {
    it( 'should start building children of the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1>' );
    } );
    
    it( 'should build two children of the target node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( ).div( );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1><div></div>' );
    } );
    
    it( 'should nest nodes when using blocks', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( ).div( function( )
        {
          this.div( function( )
          {
            this.span( );
          } );
          
          this.div( );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1><div><div><span></span></div><div></div></div>' );
    } );
    
  } );
  
  describe( 'text nodes', function( )
  {
    it( 'should be able to add text to a node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( 'testing!' );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1>testing!</h1>' );
    } );
  } );
  
  describe( 'node options', function( )
  {
    it( 'should take a hash of options and apply them to the node as attributes', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( { 'class' : 'active', id : 'testing' } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div class="active" id="testing"></div>' );
    } );
    
    it( 'should be able to accept text as the first parameter and options as the second', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( 'testing!', { 'class' : 'active' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div class="active">testing!</div>' );
    } );
  } );
} );