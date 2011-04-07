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
    
    it( 'should be able to add text to more than a node respectively without side effects', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( 'testing!' );
        this.h1( 'it works!' );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1>testing!</h1><h1>it works!</h1>' );
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
    
    it( 'should properly associate attributes with respective elements when using options', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( { 'class' : 'active' } );
        this.div( { 'class' : 'inactive' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div class="active"></div><div class="inactive"></div>' );
    } );
    
    it( 'should properly associate attributes with respective elements when using text and options', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( 'testing!', { 'class' : 'active' } );
        this.div( 'testing!', { 'class' : 'inactive' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div class="active">testing!</div><div class="inactive">testing!</div>' );
    } );
  } );
  
  describe( 'the text method', function( )
  {
    it( 'should be defined', function( )
    {
      $( '#test' ).build( function( )
      {
        expect( this.text ).toBeDefined( );
      } );
    } );
    
    it( 'should add text to the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'testing!' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div>testing!</div>' );
    } );
    
    it( 'can add text to a nested node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.h1( function( )
          {
            this.text( 'hello' );
          } );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div><h1>hello</h1></div>' );
    } );
    
    it( 'should allow you to add text to a node with children if you so desire', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'before' );
          
          this.span( function( )
          {
            this.text( 'spanned' );
          } );
          
          this.text( 'after' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div>before<span>spanned</span>after</div>' );
    } );
    
    it( 'should append text if called multiple times', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'te' );
          this.text( 'st' );
          this.text( 'in' );
          this.text( 'g!' );
        } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div>testing!</div>' );
    } );
  } );
} );