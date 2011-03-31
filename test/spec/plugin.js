describe( 'jquery plugin integration', function( )
{
  it( 'should be defined on the jquery fn object', function( )
  {
    expect( $.fn.build ).toBeDefined( );
  } );
  
  it( 'should be defined on a jquery selector', function( )
  {
    expect( $( 'div' ).build ).toBeDefined( );
  } );
} );