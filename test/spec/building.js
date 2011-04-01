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
      
    } );
  } );
  
  describe( 'node options', function( )
  {
    
  } );
} );